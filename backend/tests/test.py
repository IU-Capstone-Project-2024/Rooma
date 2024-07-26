import unittest
from os import getenv
from time import sleep

import requests

sleep(1)

BASE_URL = getenv("BASE_URL", "http://localhost/api")


class TestRoomaAPI(unittest.TestCase):
    def setUp(self):
        self.telegram_ids = [1, 2, 3]
        self.tokens = [str(telegram_id) for telegram_id in self.telegram_ids]

        for telegram_id in self.telegram_ids:
            url = f"{BASE_URL}/auth/generate_user/{telegram_id}"
            requests.post(url)

        self.telegram_id = self.telegram_ids[0]
        self.token = self.tokens[0]

    def tearDown(self):
        sleep(1)

    def test_create_hide_and_seek_game(self):
        url = f"{BASE_URL}/games/hide-n-seek/create"

        params = {"token": self.token}

        data = {
            "name": "Hide and Seek",
            "note": "Find all the hiders",
            "data": {
                "seeker_percentage": 20,
                "duration": 3,
                "time_to_hide": 0,
            },
            "owner_telegram_id": self.telegram_id,
        }

        response = requests.post(url, params=params, json=data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("game_id", response.json())
        self.assertEqual(response.json().get("game_type"), "hide_and_seek")

        return response.json().get("game_id"), response.json()

    def test_list_games(self):
        url = f"{BASE_URL}/games/list-games"
        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

        return response.json()

    def test_list_popular_games(self):
        url = f"{BASE_URL}/games/list-popular"
        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

        return response.json()

    def test_join_game(self):
        game_id, prev = self.test_create_hide_and_seek_game()

        url = f"{BASE_URL}/games/{game_id}/join"

        responses = []

        for token in self.tokens:
            params = {"token": token}

            response = requests.post(url, params=params)
            responses.append(response.json())

            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json().get("success"))

        return game_id, responses

    def test_leave_game(self):
        game_id, prev = self.test_join_game()

        url = f"{BASE_URL}/games/{game_id}/leave"

        responses = []

        for token in self.tokens:
            params = {"token": token}

            response = requests.post(url, params=params)
            responses.append(response.json())

            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json().get("success"))

        return game_id, responses

    def test_get_empty_lobby(self):
        game_id, prev = self.test_create_hide_and_seek_game()

        url = f"{BASE_URL}/games/{game_id}/lobby"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("lobby"), [])

        return game_id, response.json()

    def test_get_lobby(self):
        game_id, prev = self.test_join_game()

        url = f"{BASE_URL}/games/{game_id}/lobby"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json().get("lobby"), list)
        self.assertEqual(len(response.json().get("lobby")), len(self.tokens))

        return game_id, response.json()

    def test_start_game(self):
        game_id, prev = self.test_join_game()

        url = f"{BASE_URL}/games/{game_id}/start"

        params = {"token": self.token}

        response = requests.post(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json().get("success"))

        sleep(2)

        return game_id, response.json()

    def test_finish_game(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/{game_id}/finish"

        params = {"token": self.token}

        response = requests.post(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json().get("success"))

        return game_id, response.json()

    def test_get_rules(self):
        game_id, prev = self.test_create_hide_and_seek_game()

        url = f"{BASE_URL}/games/{game_id}/rules"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("rules", response.json())

        return game_id, response.json()

    def test_get_game(self):
        game_id, prev = self.test_create_hide_and_seek_game()

        url = f"{BASE_URL}/games/{game_id}"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("game_id", response.json())

        return game_id, response.json()

    def test_get_end_times(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/end-times"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("seeker_start_time", response.json())
        self.assertIn("game_end_time", response.json())

        return game_id, response.json()

    def test_get_game_durations(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/durations"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("duration", response.json())
        self.assertIn("time_to_hide", response.json())

        return game_id, response.json()

    def test_get_game_state(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/state"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("state", response.json())

        return game_id, response.json()

    def test_get_game_hiders(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/hiders"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertIn("hiders", response.json())

        return game_id, response.json()

    def test_get_players_roles(self):
        game_id, prev = self.test_start_game()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/role"

        responses = []

        for token in self.tokens:
            params = {"token": token, "telegram_id": int(token)}

            response = requests.get(url, params=params)
            responses.append(response.json())

            self.assertEqual(response.status_code, 200)
            self.assertIn("role", response.json())

        return game_id, responses

    def test_get_hiders_codes(self):
        game_id, prev = self.test_get_game_hiders()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/hider/code"

        responses = []

        for hider in prev.get("hiders"):
            params = {"token": str(hider["telegram_id"])}

            response = requests.get(url, params=params)
            responses.append({"telegram_id": hider["telegram_id"]})
            responses[-1].update(response.json())

            self.assertEqual(response.status_code, 200)
            self.assertIn("code", response.json())

        return game_id, responses

    def test_find(self):
        game_id, prev = self.test_get_hiders_codes()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/find"

        codes = []
        seeker_telegram_id = None

        for telegram_id in self.telegram_ids:
            is_hider = False

            for hider in prev:
                if str(hider.get("telegram_id")) == str(telegram_id):
                    is_hider = True
                    code = hider.get("code")
                    codes.append(code)
                    break

            if not is_hider:
                seeker_telegram_id = telegram_id

        sleep(2)

        responses = []

        for code in codes:
            params = {"token": str(seeker_telegram_id), "code": code}

            response = requests.post(url, params=params)
            responses.append(response.json())

            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json().get("success"))

        return game_id, responses

    def test_get_game_results_hiders(self):
        game_id, prev = self.test_find()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/results/hiders"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), len(self.telegram_ids) - 1)

        return game_id, response.json()

    def test_get_game_results_seekers(self):
        game_id, prev = self.test_get_game_results_hiders()

        url = f"{BASE_URL}/games/hide-n-seek/{game_id}/results/seekers"

        params = {"token": self.token}

        response = requests.get(url, params=params)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0].get("found"), 2)

        return game_id, response.json()


if __name__ == "__main__":
    unittest.main()

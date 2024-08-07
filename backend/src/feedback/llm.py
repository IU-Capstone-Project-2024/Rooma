import json

import requests

from src.vars.config import LLM_API_KEY


class LLM:
    def __init__(self):
        self._session = requests.session()
        self._headers = {
            "Authorization": f"Bearer {LLM_API_KEY}"
        }
        self._url = "https://openrouter.ai/api/v1/chat/completions"
        self._prompt = (
            "I organize offline games and use a special application for managing it (input some variables, etc.). "
            "After a game of {game_name}, I got feedbacks and scores from 0 to 5:\n"
            "Feedbacks:\n"
            "{feedbacks}\n"
            "The game uses these rules:\n"
            "{rules}\n"
            "The game uses these parameters:\n"
            "{parameters}\n"
            "I want you to summarize the feedbacks for me. "
            "Write what players liked, what they disliked. "
            "Be concise. DO NOT GENERATE MORE OUTPUT THAN FEEDBACKS LENGTH. "
            "Do not write anything related to application bugs, only related to game organization.\n"
            "If no feedback exists, write why nobody could have left it.\n"
            "Write in following format:\n```"
            "**What players liked**\n\n*Like 1\n*Like 2\n*etc\n\n"
            "**What players disliked**\n\n*Dislike 1\n*Dislike 2\n*etc"
            "\n```"
        )

    def generate(self, game_name: str, feedbacks: str, rules: str, parameters: str) -> str:
        data = json.dumps({
            "model": "meta-llama/llama-3-8b-instruct:free",
            "messages": [
                {
                    "role": "user",
                    "content": self._prompt.format(
                        game_name=game_name,
                        feedbacks=feedbacks,
                        rules=rules,
                        parameters=parameters
                    )
                }
            ]
        })

        response = self._session.post(
            url=self._url,
            headers=self._headers,
            data=data
        )
        response_json = json.loads(response.text)

        if "choices" not in response_json:
            print(response_json)
            return "Error while requesting AI API. Please, retry later..."
        return response_json["choices"][0]["message"]["content"]

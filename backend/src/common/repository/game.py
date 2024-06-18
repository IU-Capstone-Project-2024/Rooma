from src.database.models import Game
from src.database.repository.mongo import MongoBeanieRepository


class GameRepository(MongoBeanieRepository):
    model = Game

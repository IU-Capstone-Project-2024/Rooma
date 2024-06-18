from src.database.models import User
from src.database.repository.mongo import MongoBeanieRepository


class UserRepository(MongoBeanieRepository):
    model = User

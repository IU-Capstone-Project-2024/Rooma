class BaseAppException(Exception):
    def __init__(self, http_code: int, message: str):
        self.http_code = http_code
        self.message = message
        super().__init__(message)


class NotFoundException(BaseAppException):
    def __init__(self, message: str):
        super().__init__(404, message)


class ForbiddenException(BaseAppException):
    def __init__(self, message: str):
        super().__init__(403, message)

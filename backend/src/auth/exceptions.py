class BadDecodedSchemaException(Exception):
    """
    Raises when result of decoding has bad schema.
    """


class DecodeException(Exception):
    """
    Raises when something went bad during decoding.
    """

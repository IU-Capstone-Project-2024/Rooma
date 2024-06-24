import shortuuid


def generate_unique_codes(
        amount: int,
        length: int,
        alphabet: str = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
) -> set[str]:
    """
    Generates `amount` of unique codes from `alphabet` that have length of `length`.

    Be aware that if `amount` unique codes cannot be generated, the function will enter an infinite loop.
    It can happen if `amount` is very-very large, `length` is small, or `alphabet` is small.

    When using `amount` = 1_000_000, `length` = 6, and default 32 character `alphabet`, it works normally.

    Args:
        amount: Number of codes to generate.
        length: Length of each code.
        alphabet: Symbols to use for codes.

    Returns:
        Set of unique codes of specified length.
    """
    su = shortuuid.ShortUUID(alphabet=alphabet)

    codes: set[str] = set()
    while len(codes) != amount:
        codes.add(su.random(length))

    return codes


if __name__ == "__main__":
    s = generate_unique_codes(1_000_000, 6)
    print(len(s), len(set(s)))

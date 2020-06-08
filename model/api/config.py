from dataclasses import dataclass


@dataclass(unsafe_hash=True)
class MLConfig:
    """Class for keeping constants for MLHat API
    """
    arch_id: str
    target_size: (int,int)
    url: str


class Configurator(object):
    """Config Class, wrapper for map
    """
    configs = {}

    @classmethod
    def push(cls, label, item):
        """Push data

        Args:
            label (string): key
            item (string): value
        """
        cls.configs[label] = item

    @classmethod
    def get(cls, label):
        """Returns value with given label

        Args:
            label (string): key

        Returns:
            string: value
        """
        return cls.configs[label]

if __name__ == "__main__":
    pass
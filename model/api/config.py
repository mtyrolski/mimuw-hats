from dataclasses import dataclass

@dataclass(unsafe_hash=True)
class MLConfig:
    '''Class for keeping constants for MLHat API'''
    arch_id: str
    target_size: (int,int)
    url: str


class Configurator(object):
    configs = {}

    @classmethod
    def push(cls, label, item):
        cls.configs[label] = item

    @classmethod
    def get(cls, label):
        return cls.configs[label]

if __name__ == "__main__":
    pass
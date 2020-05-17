from keras.utils.data_utils import get_file
from tensorflow.keras.models import load_model
from abc import ABC, abstractmethod

class MLHat(ABC):
    def __init__(self, url, arch_id):
        self._model = load_model(get_file(arch_id, url))

    def __len__(self):
        return self._model.count_params()

    @property
    def model(self):
        return self._model

    @property
    def data_size(self):
        return len(self._feature_paths)

    @abstractmethod
    def predict(input):
        pass
        

class HatClassifier(MLHat):
    def init(self, url, arch_id, **model_kwargs):
        super().__init__(url, name) 
        self._model_kwargs = model_kwargs
    
    
    def predict(input):
        """
        Predicts if input represents hat or not

        Args:
            input:   model input.

        Returns:
            boolean value

        Raises:
            Internal Keras Error if input is invalid
        """
        return self._model.predict(input)

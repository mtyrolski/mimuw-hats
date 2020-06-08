from keras.utils.data_utils import get_file
from tensorflow.keras.models import load_model
from abc import ABC, abstractmethod

import warnings
with warnings.catch_warnings():
    warnings.filterwarnings("ignore", category=FutureWarning)
    import keras
    import tensorflow as tf


class MLHat(ABC):
    """Machine Learning hat algorithm base
    """
    def __init__(self, url, arch_id):
        self._session = tf.Session(graph=tf.Graph())
        with self._session.graph.as_default():
            keras.backend.set_session(self._session)
            self._model = load_model(get_file(arch_id, url))

    def len(self):
        """Returns number of params

        Returns:
            int : params
        """
        return self._model.count_params()

    @property
    def model(self):
        """Get raw model

        Returns:
            keras/tensorflow model: model
        """
        return self._model

    @property
    def data_size(self):
        """Returns size

        Returns:
            int: model length
        """
        return len(self._model)

    @abstractmethod
    def predict(self, input):
        pass
        

class HatClassifier(MLHat):

    def __init__(self, url, arch_id, **model_kwargs):
        super().__init__(url, arch_id) 
        self._model_kwargs = model_kwargs

    def predict(self, input):
        """
        Predicts if input represents hat or not

        Args:
            input:   model input.

        Returns:
            boolean value

        Raises:
            Internal Keras Error if input is invalid
        """
        with self._session.graph.as_default():
            keras.backend.set_session(self._session)
            [[hat, nothat]] = self._model.predict(input)
            model_out = {"pred":('hat' if hat > nothat else 'nothat')}
        return model_out

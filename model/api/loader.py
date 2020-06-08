import numpy as np

import warnings
with warnings.catch_warnings():
    warnings.filterwarnings("ignore", category=FutureWarning)
    from keras.preprocessing import image as imageK


def load_image(img_path, shape):
    """Loads image in KERAS mdoe

    Args:
        img_path (string): path to image
        shape (tuple<int>): shape of image

    Returns:
        keras image : image
    """
    img = imageK.load_img(img_path, target_size=shape, color_mode='rgb')
    return prepare_image(img)


def prepare_image(image, shape):
    """Prepares image

    Args:
        image (numpy array): image data
        shape (tuple<int>): shape of image

    Returns:
        tensor image : image
    """
    img_tensor = imageK.img_to_array(image)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.
    return img_tensor
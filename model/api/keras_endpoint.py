# MLHat methods/classes
from loader import prepare_image
from mlhat import HatClassifier
from config import Configurator as Cfg
from config import MLConfig
from similarity import sim

# Others improts
from PIL import Image
import flask
import io
import warnings

with warnings.catch_warnings():
    warnings.filterwarnings("ignore", category=FutureWarning)
    import tensorflow as tf


app = flask.Flask(__name__)
hatter = None
boxer = None

def load_model():
	"""loads model with architecture & weights
	"""
	global hatter
	config = Cfg.get('classifier')
	hatter = HatClassifier(config.url, config.arch_id)

@app.route("/predict_binary", methods=["POST"])
def predict_binary():
	"""Predicts if image is hat or not.

	Returns:
		dict: json-like dictionary
	"""
	data = {"success": False}

	if flask.request.method == "POST":
		if flask.request.files.get("image"):
			config = Cfg.get('classifier')
			global hatter
			image = flask.request.files["image"].read()
			image = Image.open(io.BytesIO(image))
			image = prepare_image(image, config.target_size)
			graph = tf.Graph()
			with graph.as_default():
				pred = hatter.predict(image)
			data = {**data, **pred}

			data["success"] = True
	return flask.jsonify(data)

@app.route("/similarity", methods=["POST"])
def similarity():
	"""Predicts if images are similar or not.

	Returns:
		dict: json-like dictionary
	"""
	data = {"success": False}
	if flask.request.method == "POST":
		if flask.request.files.get("img1") and flask.request.files.get("img2"):
			a = flask.request.files["img1"].read()
			b = flask.request.files["img2"].read()
			similarity_result = sim(Image.open(io.BytesIO(a)), Image.open(io.BytesIO(b)))
			data = {**data, **similarity_result}
			data["success"] = True
			
	return flask.jsonify(data)

if __name__ == "__main__":
	print(("* Loading Keras model and Flask starting server..."
		"please wait until server has fully started"))

	import logging
	import os
	os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # FATAL
	logging.getLogger('tensorflow').setLevel(logging.FATAL)
	Cfg.push('classifier', MLConfig('mobile_ultra',(224,244), 'http://students.mimuw.edu.pl/~mt406390/machine_learning/mobilenet_ultra.h5'))
	load_model()
	app.run()
# MLHat methods/classes
from loader import prepare_image
from mlhat import HatClassifier
from config import Configurator as Cfg
from confing import MLConfig

# Others improts
from PIL import Image
import numpy as np
import flask
import io

app = flask.Flask(__name__)
hatter = None
boxer = None

def load_model():
	global hatter
	config = Cfg.get('classifier')
	hatter = HatClassifier(config.url, config.arch_id)

@app.route("/predict_binary", methods=["POST"])
def predict_binary():
	data = {"success": False}

	if flask.request.method == "POST":
		if flask.request.files.get("image"):
			image = flask.request.files["image"].read()
			image = Image.open(io.BytesIO(image))

			image = prepare_image(image,(224, 224))

			pred = model.predict(image)	
			data.append(pred)

			data["success"] = True

	return flask.jsonify(data)

if __name__ == "__main__":
	print(("* Loading Keras model and Flask starting server..."
		"please wait until server has fully started"))
	Cfg.push('classifier', MLConfig('mobile_ultra',(224,244), 'http://students.mimuw.edu.pl/~mt406390/machine_learning/mobilenet_ultra.h5'))
	load_model()
	app.run()
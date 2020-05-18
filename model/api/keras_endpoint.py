# MLHat methods/classes
from loader import prepare_image
from mlhat import HatClassifier
from config import Configurator as Cfg
from config import MLConfig

# Others improts
from PIL import Image
import flask
import io
import tensorflow as tf

app = flask.Flask(__name__)
#hatter = None
boxer = None

def load_model():
	#global hatter
	#config = Cfg.get('classifier')
	#global graph
	#graph = tf.get_default_graph()
	#tf.reset_default_graph()

	#hatter = HatClassifier(config.url, config.arch_id)
	pass

@app.route("/predict_binary", methods=["POST"])
def predict_binary():
	data = {"success": False}

	if flask.request.method == "POST":
		if flask.request.files.get("image"):
			config = Cfg.get('classifier')

			image = flask.request.files["image"].read()
			image = Image.open(io.BytesIO(image))
			hatter = HatClassifier(config.url, config.arch_id)
			image = prepare_image(image, config.target_size)
			pred = hatter.predict(image)
			data = {**data, **pred}

			data["success"] = True
	return flask.jsonify(data)

if __name__ == "__main__":
	print(("* Loading Keras model and Flask starting server..."
		"please wait until server has fully started"))
	Cfg.push('classifier', MLConfig('mobile_ultra',(224,244), 'http://students.mimuw.edu.pl/~mt406390/machine_learning/mobilenet_ultra.h5'))
	load_model()
	app.run()
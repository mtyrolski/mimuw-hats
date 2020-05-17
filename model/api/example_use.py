# Preferred use via Google Colab

import HatClassifier, load_image

url='http://students.mimuw.edu.pl/~mt406390/machine_learning/mobilenet_ultra.h5'
hatter = HatClassifier(url, 'mobileultra')
hatter._model.summary()
shape=(224,224)

print('\n\n\n======czapki=======', end='\n\n\n')
for l in ['hats/makohat', 'hats/testpompon', 'hats/ruska','hats/m1','hats/m2']:
  print(l, end=' ')
  img = load_image(pl.format(l),shape)
  print(hatter.predict(img))
  
print('\n\n\n======nieczapki=======', end='\n\n\n')
for l in ['nothats/nh', 'nothats/0B1XDdfQab226', 'nothats/0UT0MJM7jx91', 'nothats/3SAjapIppo70', 'nothats/4I56tbswBJ239', 'nothats/nh3']:
  print(l, end=' ')
  img = load_image(pl.format(l), shape)
  print(hatter.predict(img))

print('\n\n\n======czapki boro=======', end='\n\n\n')
for i in range(1,22):
  print(i, end=' ')
  img = load_image(pl.format(f'hats/{i}.JPG'))
  print(hatter.predict(img), shape)
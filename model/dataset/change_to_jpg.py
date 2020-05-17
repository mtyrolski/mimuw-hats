import os

for filename in os.listdir('./'):
    os.rename(filename, filename+'.jpg')
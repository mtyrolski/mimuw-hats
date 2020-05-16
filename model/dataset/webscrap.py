import sys

dest = sys.argv[1]
infile = sys.argv[2]

assert(dest)
assert(infile)

import urllib.request
import glob, os

trashhold = 10 # Bad magic number but works with urlscrap.js
with open(infile, 'r') as input:
    lines = input.readlines()
    for i, l in enumerate(lines):
        if len(l) < trashhold:
            continue
        urllib.request.urlretrieve(l, dest+str(i))

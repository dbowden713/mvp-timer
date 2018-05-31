import json
from pprint import pprint
import urllib

with open('../../../src/mvps.json') as f:
    data = json.load(f)

for mvp in data['mvps']:
    for map in mvp['respawn']:
        #print map['map']
        response = urllib.urlretrieve('http://file5.ratemyserver.net/maps/' + map['map'] + '.gif', map['map'] + '.gif')
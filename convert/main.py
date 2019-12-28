import re, sys

ITEMS = 34

ORG = 24

itemsD = [
	[
		1
	],
	[
		2
	],
	[
		8
	],
	[
		9
	],
	[
		10
	],
	[
		11
	],
	[
		12
	],
	[
		13
	],
	[
		14
	],
	[
		16
	],
	[
		17
	],
	[
		18
	],
	[
		19
	],
	[
		20
	],
	[
		21
	],
	[
		22
	],
	[
		23
	],
	[
		24
	],
	[
		25
	],
	[
		26
	],
	[
		27
	],
	[
		28
	],
	[
		29
	],
	[
		30
	],
	[
		31
	],
	[
		32
	],
	[
		33
	],
	[
		34
	],
	[
		35
	],
	[
		36
	],
	[
		37
	],
	[
		38
	],
	[
		39
	],
	[
		40
	]
]

itemsD = [f[0] for f in itemsD]
#print(itemsD)

inputText = """{{CCM|medium|medium}}
|{{CCM|low|low}}
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|"""

valueMap = {
	'none': 1,
	'low': 2,
	'medium': 3,
	'high': 4
}

def parseOneItem(inputText):
	inputText = inputText.strip()
	if inputText == '' or inputText == 'n.a.':
		return False

	if '{{CCM|' in inputText:
		parts = re.search("\{\{CCM\|([^\|]+)\|([^\}]+)}}",inputText)
		if parts:
			capacity = parts.group(1)
			robust = parts.group(2)
			
			return [valueMap[capacity],valueMap[robust]]
		else:
			return False

	return False

parsed = inputText.rsplit('\n|')

if len(parsed) != ITEMS:
	print('HHHH')
	sys.exit()
#

print(parsed)
print(len(parsed))

cmds = []

for idx, one in enumerate(parsed):
	parsedData = parseOneItem(one)
	itemID = itemsD[idx]

	if parsedData:
		capacit, rob = parsedData
		currComm = [itemID, ORG, capacit, rob]
		cmds.append('\t'.join(map(str,currComm)))

	#print()
#	print(idx)
#
forSave = '\n'.join(cmds)
print(forSave)

fileS = open('ratings-{}.txt'.format(ORG),'w')

fileS.write(forSave)
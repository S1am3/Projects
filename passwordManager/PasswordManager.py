import string
import random
class Password():
    def __init__(self,password=""):
        self.password = password

    def __str__(self):
        return self.password

class passwordGen():
    def passw():
    #get ascii and length
        lowerLetter = string.ascii_lowercase
        upperLetter = string.ascii_uppercase
        numbers = string.digits
        symbolsCase = string.punctuation
        length = 8
        #add all together
        all = lowerLetter + upperLetter + numbers+ symbolsCase
        to = random.sample(all,length)
        thePassword = "".join(to)
        print(thePassword)
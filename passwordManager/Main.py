# from PasswordManager import Password
from Account import Account
from User import User
import string
import random
from cryptography.fernet import Fernet



# functions and variables
ui = "0"
tries = 0
masterUserList = []
masterAccountList = []

# Check password requirement - Sam
def checkStrength(password):
    count = len(password)>=8
    num = False
    speca = False
    cap = False
    #if car in password has a uppercase,digits and punctuation and has 8 letter or number return True else return False
    for char in password:
        if char in string.ascii_uppercase:
            cap = True
        elif char in string.digits:
            num = True
        elif char in string.punctuation:
            speca = True
    if num and speca and cap and count:
        return True
    else:
        return False


#login use def check strength if meet requirement - Jonah         
def login():
    tries = False
    k = 0
    #While tries equal False and less the 3 loop
    while tries == False and k < 3:
        user = input("Username: " )
        passw = input("Password: ")
# #read reg.txt file
#         key = ""
#         file2 = open("topSecret.key","rb")
#         key = file2.read()
#         encrypteddata = ""
#         file2 = open("secretInfo.txt","rb")
#         encrypteddata = file2.read()
#         f = Fernet(key)
#         decryptedData = f.decrypt(encrypteddata)
        
#         print("Encrypted Data: ", encrypteddata.decode())
#         print("")
#         dta = (decryptedData.decode())
#         print(dta)

        #read reg.txt file
        file1 = open("reg.txt","r")
        file1 = file1.readlines()
#for line in file rstrip and split it with , 
        for line in file1:
            username,password,first,last = line.rstrip().split(",")
            #if password and username match password and username in txt file trie to true
            if user == username and passw == password:
                print("login good")
                tries = True
        if tries == True:
            k += 3
            return True, user
        if tries == False:
            print("Incorrect")
            k += 1
    if tries == False and k == 3:
        return False


#register - Jonah
def register():
    check = False
    #While check is false loop
    while check == False:
        aNewFirst = input("First Name: ")
        aNewLast = input("Last Name: ")
        aNewUsername = input("Username: ")
        aNewPass = input("Password: ")
#Check pass strength
        passCheck = checkStrength(aNewPass)
#if passcheck is true
#append user input from register to ref.txt file
        if passCheck == True:
            file1 = open("reg.txt","a")
            file1.write(f"{aNewUsername},{aNewPass},{aNewFirst},{aNewLast}\n")
            file1.close()
            aNewUser = User(aNewFirst, aNewLast, aNewUsername, aNewPass)
            fileToWriteTo = open(f"{aNewUser.username}.txt","w") 
            fileToWriteTo.close
            # key = ""
            # file2 = open("topSecret.key","rb")
            # key = file2.read()
            # data = ""
            # file2 = open("reg.txt","rb")
            # data = file2.read()
            # f = Fernet(key)
            # encryptedData = f.encrypt(data)
            # file3 = open("secretInfo.txt", "wb")
            # file3.write(encryptedData)
            check = True
            #elif false ask user to try again
        elif passCheck == False:
            print("Invalid Password Requirements")
            print('''
    password requirement
  1. atleast 8 characters  
  2. contains numbers
  3. contains special chars
  4. contains capitals
  ''')

# adds account to the account list for each user - Jonah
def addAccount(accountUser):
    choice = input("Would you like a random generated password? (y/n)")
    if choice == "y":
        pas = passw()
        newAccount = Account(input("Category: "), input("What do you want to call this account? "),
                         input("Username: "),
                         pas)
    if choice == "n":
        newAccount = Account(input("Category: "), input("What do you want to call this account? "),
                             input("Username: "),
                             input("Password: "))
    # adds the account to a list so it is able to be printed
    masterAccountList.append(newAccount)
    # addes the account to the users txt file
    for accounts in masterAccountList:
        fileToWriteTo = open(f"{accountUser}.txt","a")
        fileToWriteTo.write(accounts.__str__()) 
        fileToWriteTo.close
    masterAccountList.pop()

# random password generator - Sam
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
    return thePassword

# I couldn't figure it out how to edit a text file in order to change the output - Jonah
def editAccount(accountUser):
    # open the text file to see everything and to show the user what they can change
    f = open(f'{accountUser}.txt', 'r')
    file_contents = f.read()
    print(file_contents)
    f.close()
    # ask the user what line to change and what to change it to
    choice = input("Which line would you like to change? ")
    newOption = input("What would you like to change it to? ")
    #open the file
    file1 = open(f"{accountUser}.txt","a")
    # find the line the user wants to change
    file1.seek(int(choice))
    # change the line to what the user wants
    file1.write(newOption)
     

#couldn't figure out - Sam
        #which post to edit
        # idToEdit=int(input("Which item needs to be editted? "))
        # if(aNewUsername==masterUserList[idToEdit].get_user_name()):
        #     #obtain the new message
        #     newMessage = input("What is the new message? ")
        #     #set the new message
        #     masterUserList[int(idToEdit)].set_message(newMessage)
        



# running code - Jonah and Sam
while ui != "3":
    print('''
           ::PASSWORD MANAGER::
-------------Login or SignUp-------------
1. Login
2. SignUp
3. Exit 
-----------------------------------------
          ''')
    ui = input("What would you like to do? ")
    if ui == "1":
        userInput, accountUser = login()
        while userInput == True:
            print(f'''
--------------Password Manager--------------
1. Add Account
2. Account List
3. Edit/Delete Accounts (not avalible at this time :) )
4. Password Generator
5. Exit
--------------------------------------------
''')
            choice = input("What would you like to do? ")
            if choice == "1":
                addAccount(accountUser)
            elif choice == "2":
                f = open(f'{accountUser}.txt', 'r')
                file_contents = f.read()
                print(file_contents)
                f.close()
            elif choice == "3":
                #try edit did not work - Sam
                editAccount(accountUser)
            elif choice == "4":
                passw()
            elif choice == "5":
                userInput = False
        if userInput == False:
            ui = "3"
    elif ui == "2":
        register()
        ui = "0"

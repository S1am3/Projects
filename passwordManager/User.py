class User():
    def __init__(self,firstName,lastName,username,password):
        self.firstName = firstName
        self.lastName = lastName
        self.username = username
        self.password = password
        
    def __str__(self):
        out = f"{self.firstName} {self.lastName}"
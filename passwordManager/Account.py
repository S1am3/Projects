class Account:
    
    def __init__(self,category, accNam, username, password):
        self.username = username
        self.password = password
        self.accNam = accNam
        self.category = category

    def __str__(self):
        
        string=f"""Category: {self.category}
    Name: {self.accNam}
    username: {self.username}
    password: {self.password}
"""
        return string
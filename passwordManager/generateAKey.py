from cryptography.fernet import Fernet
key = Fernet.generate_key()
# encryption key
file1 = open("topSecret.key","wb")
file1.write(key)

# all information and code about encrytion was provide by this gentlemen
# https://www.youtube.com/watch?v=vk4WWIreH8Q
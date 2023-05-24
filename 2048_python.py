import random
import msvcrt

board = [[0 for _ in range(4)] for _ in range(4)]

def initialize_board():
        for row in range(0,4):
            for col in range(0,4):
                board[row][col] = 0

def fill_random_position():
        tile_count=0
        for row in range(0, 4):
            for col in range(0, 4):
                if board[row][col] != 0:
                    tile_count = tile_count + 1
        
        if tile_count == 16:
            return
        row = random.randint(0, 3)
        col = random.randint(0, 3)
        if board[row][col]==0:
            board[row][col] = 2
        else:
            fill_random_position()

def rowEmpty(row):
        for col in range(0,4):
            if board[row][col] != 0:
                return 0
        return 1

def colEmpty(col):
        for row in range(4):
            if board[row][col] != 0:
                return 0
        return 1

def isGameOver():
        for row in range(0, 4):
            for col in range(0, 4):
                if board[row][col] == 2048:
                    return 100
        for row in range(0, 4):
            for col in range(0, 4):
                if board[row][col]==0:
                    return 0
                if col!=3 and row!=3:
                    if board[row][col] == board[row][col+1] or board[row][col] == board[row+1][col]:
                        return 0
        return 1

def print_matrix():
        print()
        for row in range(0, 4):
            for col in range(0, 4):
                print("{:<4}".format(board[row][col]), end=" ")
            print()
        print()

def moveLeft():
    for row in range(4):
        if rowEmpty(row):
            continue
        for i in range(4):
            for col in range(3, 0, -1):
                if board[row][col] != 0 and board[row][col - 1] == 0:
                    board[row][col], board[row][col - 1] = board[row][col-1], board[row][col]
        for col in range(3):
            if board[row][col] == board[row][col + 1]:
                board[row][col] = 2 * board[row][col]
                board[row][col + 1] = 0
        for i in range(4):
            for col in range(3, 0, -1):
                if board[row][col] != 0 and board[row][col - 1] == 0:
                    board[row][col], board[row][col - 1] = board[row][col-1], board[row][col]

def moveRight():
    for row in range(4):
        if rowEmpty(row):
            continue
        for i in range(4):
            for col in range(0, 2):
                if board[row][col] != 0 and board[row][col + 1] == 0:
                    board[row][col], board[row][col + 1] = board[row][col+1], board[row][col]
        for col in range(3, 0, -1):
            if board[row][col] == board[row][col - 1]:
                board[row][col] = 2 * board[row][col]
                board[row][col - 1] = 0
        for i in range(4):
            for col in range(0, 3):
                if board[row][col] != 0 and board[row][col + 1] == 0:
                    board[row][col], board[row][col + 1] = board[row][col+1], board[row][col]

def moveUp():
    for col in range(4):
        if colEmpty(col):
            continue
        for i in range(4):
            for row in range(3, 0, -1):
                if board[row][col] != 0 and board[row - 1][col] == 0:
                    board[row][col], board[row - 1][col] = board[row - 1][col], board[row][col]
        for row in range(3):
            if board[row][col] == board[row + 1][col]:
                board[row][col] = 2 * board[row][col]
                board[row + 1][col] = 0
        for i in range(4):
            for row in range(3, 0, -1):
                if board[row][col] != 0 and board[row - 1][col] == 0:
                    board[row][col], board[row - 1][col] = board[row - 1][col], board[row][col]

def moveDown():
    for col in range(4):
        if colEmpty(col):
            continue
        for i in range(4):
            for row in range(0, 3):
                if board[row][col] != 0 and board[row + 1][col] == 0:
                    board[row][col], board[row + 1][col] = board[row + 1][col], board[row][col]
        for row in range(3, 0, -1):
            if board[row][col] == board[row - 1][col]:
                board[row][col] = 2 * board[row][col]
                board[row - 1][col] = 0
        for i in range(4):
            for row in range(0, 3):
                if board[row][col] != 0 and board[row + 1][col] == 0:
                    board[row][col], board[row + 1][col] = board[row + 1][col], board[row][col]

def get_arrow_key():
    while True:
        if msvcrt.kbhit():
            key = ord(msvcrt.getch())
            if key == 224:  # Arrow key prefix
                key = ord(msvcrt.getch())
                if key == 72:
                    return 'up'
                elif key == 80:
                    return 'down'
                elif key == 75:
                    return 'left'
                elif key == 77:
                    return 'right'

random.seed()
initialize_board()
fill_random_position()
print_matrix()
while isGameOver() == 0:
    '''print("1.Left\t\t2.Right\t\t3.Up\t\t 4.Down\t\t5.Reset")
    ch = int(input("Enter your move: "))'''
    ch = get_arrow_key()
    if ch == 'left':
        moveLeft()
    elif ch == 'right':
        moveRight()
    elif ch == 'up':
        moveUp()
    elif ch == 'down':
        moveDown()
    elif ch == 'r':
        initialize_board()
    else:
        print("Invalid choice.")
    fill_random_position()
    print_matrix()
if isGameOver() == 100:
        print("You WIN")
if isGameOver() == 1:
    print("You LOST better luck next time :)")

//Code for the 2048 game in C language, by N Sri Abhiram.
#include<stdio.h>    //in c 
#include<stdlib.h> // in C, for rand() 
#include<time.h>    //for time() 

int board[4][4];
void swap(int *a,int *b){
    int c=*a;
    *a=*b;
    *b=c;
}
int rowEmpty(int row){
    for(int i=0;i<4;i++){
        if(board[row][i]!=0){
            return 0;
        }
    }
    return 1;
}
int colEmpty(int col){
    for(int i=0;i<4;i++){
        if(board[i][col]!=0){
            return 0;
        }
    }
    return 1;
}
int GameOver(){
    for(int row=0;row<4;row++){
        for(int col=0;col<4;col++){
            if(board[row][col]==0 || board[row][col]==board[row][col+1] || board[row][col]==board[row+1][col]){
                return 0;
            }
        }
    }
    return 1;
}
void print_matrix(){
    printf("\n");
    for(int row=0;row<4;row++){
        for(int col=0;col<4;col++){
            printf("%i ", board[row][col]);
        }
        printf("\n");
    }
    printf("\n");
}
int gen_number(){
    return rand()%4;
}
void moveLeft(){
    for(int row=0;row<4;row++){
        if(rowEmpty(row)){
            continue;
        }
        for(int i=0;i<4;i++){
            for(int col=3;col>i;col--){
                if(board[row][col]!=0 && board[row][col-1]==0){
                    swap(&board[row][col],&board[row][col-1]);
                }
            }
        }
        for(int col=0;col<3;col++){
            if(board[row][col]==board[row][col+1]){
                board[row][col] = 2*board[row][col];
                board[row][col+1]=0;
            }
        }
        for(int i=0;i<4;i++){
            for(int col=3;col>i;col--){
                if(board[row][col]!=0 && board[row][col-1]==0){
                    swap(&board[row][col],&board[row][col-1]);
                }
            }
        }
    }    
}
void moveRight(){
    for(int row=0;row<4;row++){
        if(rowEmpty(row)){
            continue;
        }
        for(int i=0;i<4;i++){
            for(int col=i;col<3;col++){
                if(board[row][col]!=0 && board[row][col+1]==0){
                    swap(&board[row][col],&board[row][col+1]);
                }
            }
        }
        for(int col=3;col>=0;col--){
            if(board[row][col]==board[row][col-1]){
                board[row][col] = 2*board[row][col];
                board[row][col-1]=0;
            }
        }
        for(int i=0;i<4;i++){
            for(int col=i;col<3;col++){
                if(board[row][col]!=0 && board[row][col+1]==0){
                    swap(&board[row][col],&board[row][col+1]);
                }
            }
        }
    }    
}
void moveUp(){
    for(int col=0;col<4;col++){
        if(colEmpty(col)){
            continue;
        }
        for(int i=0;i<4;i++){
            for(int row=3;row>i;row--){
                if(board[row][col]!=0 && board[row-1][col]==0){
                    swap(&board[row][col],&board[row-1][col]);
                }
            }
        }
        for(int row=0;row<3;row++){
            if(board[row][col]==board[row+1][col]){
                board[row][col] = 2*board[row][col];
                board[row+1][col]=0;
            }
        }
        for(int i=0;i<4;i++){
            for(int row=3;row>i;row--){
                if(board[row][col]!=0 && board[row-1][col]==0){
                    swap(&board[row][col],&board[row-1][col]);
                }
            }
        }
    }    
}
void moveDown(){
    for(int col=0;col<4;col++){
        if(colEmpty(col)){
            continue;
        }
        for(int i=0;i<4;i++){
            for(int row=i;row<3;row++){
                if(board[row][col]!=0 && board[row+1][col]==0){
                    swap(&board[row][col],&board[row+1][col]);
                }                
            }
        }
        for(int row=3;row>=0;row--){
            if(board[row][col]==board[row-1][col]){
                board[row][col] = 2*board[row][col];
                board[row-1][col]=0;
            }
        }
        for(int i=0;i<4;i++){
            for(int row=i;row<3;row++){
                if(board[row][col]!=0 && board[row+1][col]==0){
                    swap(&board[row][col],&board[row+1][col]);
                }                
            }
        }
    }
}

int main() { 
    int ch;
    srand(time(0));
    do{
        int row = gen_number();
        int col = gen_number();
        if(board[row][col]==0){
            board[row][col] = 2;
        }
        print_matrix();
        printf("1.Left \t\t 2.Right \t\t 3.Up \t\t 4.Down\nEnter your move:");
        scanf("%d",&ch);
        switch(ch){
            case 1:
                moveLeft();
                break;
            case 2:
                moveRight();
                break;
            case 3:
                moveUp();
                break;
            case 4:
                moveDown();
                break;
            default:
                printf("Invalid choice.\n");
        }
    }while(!GameOver());
    printf("\nWell played.\n");
    return 0;
}

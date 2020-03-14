/* 
    git init 初始化工作区  
    ``工作区就是个文件夹
    ?什么文件夹才称为工作区呢
    在你的文件夹下有另一个文件夹才称为工作区
    ! .git文件夹 才称为工作区


    git add . //将代码提交到工作区
    git commit -m 'init'      //将缓存区代码提交到版本区
    git remote add origin https://github.com/lucy3505/learn-react_AdminClient.git  远程仓库地址

    现在本地有分支，远程没有分支
    ``git push origin master
    这个master有两个作用，现在是本地有master分支，远程没有，会自动创建master分支

     * [new branch]      master -> master 说明远程创建了新的分支  master

     ``git checkout -b dev  这个是创建dev分支同时切到dev分支
     创建分支一般是要看根据哪个分支创建的，刚才是在master分支下去创建的，所以现在创建出来的dev分支是和master分支上的代码一样
     checkout 是切换  -b是如果没有这个分支则自动创建
     左下角能看到你当前的分支
     ``git branch  则看你当前分支
     现在本地有两个分支，但远程只有一个master分支，这时候要将本地dev推到远程dev
     ``git push origin dev  远程没有dev分支就会自动创建
      * [new branch]      dev -> dev
     
*/

/* 
    ?git clone https://github.com/lucy3505/learn-react_AdminClient.git
    cd  learn-react_AdminClient  进入文件
    git branch  发现只有master  但远程是有两个分支的

    git remote -v 得到两个地址
    clone应该是完整的拷贝  那远程的两个分支应该是都有，但本地默认只创建master分支

    在本地的master分支下如果执行下面的代码，则是在远程的master分支的代码创建了本地的dev分支代码，本地的dev分支的代码是远程master上的代码，不可以,这样本地的dev和master分支内容就完全一样
    ``git checkout -b dev


    我要根据远程的dev创建本地的dev分支
    !  git checkout -b dev origin/dev 
    这条是根据远程的dev创建本地的dev

    *git diff dev master  
    用来比较本地dev和master分支上的不同

    !  git pull origin dev

    ?当新同事在创建了一个新的分支，你本地是不知道的，这时候怎么办？
    !git pull
    !git checkout -b xyy origin/xyy
    这时候你就进了新分支

*/

/*
# 设置ss
git config --global http.proxy 'socks5://127.0.0.1:1080'
! git config --global http.proxy 'http://127.0.0.1:1080'

git config --global https.proxy 'socks5://127.0.0.1:1080'

设置代理 git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

!取消代理 git config --global --unset http.proxy

git config --global --unset https.proxy


*/

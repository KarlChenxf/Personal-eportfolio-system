###
 # @Descripsion: 
 # @Author: Xuefeng Chen
 # @Date: 2020-03-30 19:04:15
 # @LastEditTime: 2020-03-30 19:04:15
 ###
lsof -i:9090 |awk '{print $2}' | sed -n '2p' | xargs kill -9

cd ~/backend/Personal-eportfolio-system/eportfolio
echo "script start"
git pull
mvn package
cd target
nohup java -jar eportfolio-0.0.1-SNAPSHOT.jar > temp.out &

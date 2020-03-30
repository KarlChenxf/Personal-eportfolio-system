###
 # @Descripsion: 
 # @Author: Xuefeng Chen
 # @Date: 2020-03-30 14:59:59
 # @LastEditTime: 2020-03-30 14:59:59
 ###
lsof -i:9090 |awk '{print $2}' | sed -n '2p' | xargs kill -9

mvn package
cd target
nohup java -jar eportfolio-0.0.1-SNAPSHOT.jar > temp.out &

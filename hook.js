/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-30 17:52:10
 * @LastEditTime: 2020-03-30 19:05:47
 */
var http = require('http')
var spawn = require('child_process').spawn
var createHandler = require('github-webhook-handler')

var handler = createHandler({ path: '/deploy', secret: 'softwareproject' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location: ')
  })
}).listen(9091)


handler.on('error', function (err) {
  console.error('Error:')
})
handler.on('push', function (event) {
  if (event.payload.repository.name == "refs/heads/backend"){
      console.log("restarting backend")
      runCommand('sh', ['./restart_backend.sh'], function (txt){
          console.log(txt)
      })
  }
  if (event.payload.repository.name == "refs/heads/backend"){

  }
  if (event.payload.repository.name == "refs/heads/webhook"){
     console.log("webhook here")
      runCommand('sh', ['./restart_backend.sh'], function (txt){
          console.log(txt)
      })
  }
})
function runCommand (cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) { response += buffer.toString() })
  child.stdout.on('end', function () { callback(response) })
}

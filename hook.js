/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-30 17:52:10
 * @LastEditTime: 2020-03-30 18:53:52
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
  console.log(event)
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  runCommand('sh', ['./start.sh'], function (txt) {
    console.log(txt)
  })
})
function runCommand (cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) { response += buffer.toString() })
  child.stdout.on('end', function () { callback(response) })
}
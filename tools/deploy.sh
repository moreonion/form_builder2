#!/bin/sh
# Cleanup
ssh dinony@dinony.com 'cd www/static/projects/fb2; rm -rf dist'
ssh dinony@dinony.com 'cd www/static/projects/fb2; ls'
# Deploy
scp -r dist dinony@dinony.com:~/www/static/projects/fb2/dist
scp index.html dinony@dinony.com:~/www/static/projects/fb2/index.html

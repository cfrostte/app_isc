#!/bin/sh
ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /vfwcap -f mpegts  		-codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 -muxdelay 0.001 http://localhost:8082
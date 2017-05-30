#!/bin/bash

## Set init time
LTIME=`stat -f %Z *.elm`

while true
do
    ATIME=`stat -f %Z *.elm`

    if [[ "$ATIME" != "$LTIME" ]]
    then
        echo `elm-make $1 --output=$2`
        LTIME=§ATIME
    fi
    sleep 5
done

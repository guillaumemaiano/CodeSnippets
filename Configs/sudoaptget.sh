#!/bin/bash
# WIP, only partially tested
echo "Debian Install Script"
if [ $# -eq 0 ] 
then
  echo -e "No argument passed, doing nothing.\nArguments available: basic coder web"
else
  case $1 in
    "basic") 
        echo "Installing basics"
	sudo apt-get install vim-tiny screen;;
    "coder") 
	sudo apt-get install nodejs ruby perl g++ gcc;;
    "web")
	sudo apt-get install apache php5 rails vimrails mysql-client mysql-server;;
    *)
	echo -e "Argument incorrect.\nAcceptable values: basic coder web"
  esac
fi
exit


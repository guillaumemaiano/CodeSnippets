export LC_ALL=C
export CLICOLOR=1
export PATH=/opt/local/bin:/opt/local/sbin:$PATH

# next two lines are primarily Mac fixes
export LSCOLORS=GxFxCxDxBxegedabagaced
[[ -s ~/.bashrc ]] && source ~/.bashrc

# Next two lines are Apple Finder programmer-friendly modifiers
alias showfiles='defaults write com.apple.finder AppleShowAllFiles YES && killall Finder /system/Library/CoreServices/Finder.app'
alias hidefiles='defaults write com.apple.finder AppleShowAllFiles NO && killall Finder /system/Library/CoreServices/Finder.app'

# shortcuts
alias la="ls -la"
alias dfh="df -h"
alias sassc='sass --compass'

# SSH aliases depending on the platform and location
let PORT=21
URL_PI='undefined'
##### must be edited when pulled on a new platform ####
if [ $PORT -eq 21 ]; then echo -e "\x1B[1;35mSSH runs on default port\x1B[0m"; fi
if [ $URL_PI == "undefined" ]; then echo -e "\x1B[31mPI_URL undefined, config not set\x1B[0m"; fi
if [ `uname -s` == "Darwin" ]; then
SSID=`/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'`
echo -e "\x1B[33m*** Currently using $SSID ***\x1B[0m" 
  alias sshpi="if [ `/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'` == 'GeM' ]; then ssh pi@192.168.0.23;  else  ssh -p $PORT $URL_PI; fi" # set depending on current config
elif [ `uname -s` == "Linux" ]; then
  alias sshpi="if [ `nmcli -t -f ssid dev wifi| cut -d\' -f2` == "GeM"  ]; then ssh pi@192.168.0.23;  else  ssh -p $PORT $URL_PI; fi"
fi
alias sshams="ssh projects.astutemonkey.com"

# MacPorts insists on adding this (for good reason) 
export PATH="/opt/local/bin:/opt/local/sbin:$PATH"

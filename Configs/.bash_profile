export LC_ALL=C
export CLICOLOR=1
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
export LSCOLORS=GxFxCxDxBxegedabagaced
alias la="ls -la"
alias dfh="df -h"
if [ `uname -s` == "Darwin" ]; then
  alias sshpi="if [ `/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'` == 'GeM' ]; then ssh pi@192.168.0.23;  else  ssh -p PORT URL_PI; fi" # set depending on current config
elif [ `uname -s` == "Linux" ]; then
  alias sshpi="if [ `nmcli -t -f ssid dev wifi| cut -d\' -f2` == "GeM"  ]; then ssh pi@192.168.0.23;  else  ssh -p PORT URL_PI; fi"
fi
alias sshams="ssh projects.astutemonkey.com"

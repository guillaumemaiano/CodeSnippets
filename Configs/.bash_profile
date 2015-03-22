export LC_ALL=C
export CLICOLOR=1
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
export LSCOLORS=GxFxCxDxBxegedabagaced
alias la="ls -la"
alias dfh="df -h"
alias sshpi="if[ /@System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}' -eq 'GeM' ] ssh 192.168.0.23  else  ssh -p PORT URL_PI fi" # set depending on current config
alias sshams="ssh projects.astutemonkey.com"

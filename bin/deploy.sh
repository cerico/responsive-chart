source config.env
rsync -Pav -e "ssh -i $key" server.js $user@$server:/var/www/html/$server
rsync -Pav -e "ssh -i $key" dist "$user@$server:/var/www/html/$server"
rsync -Pav -e "ssh -i $key" package.json "$user@$server:/var/www/html/$server"
ssh $user@$server -i $key pm2 restart $server

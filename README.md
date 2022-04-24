# Love of mathematics

Hello, welcome to my public code. Most are focused on helping others learn or mathematics for the joy of itself. For my access to my professional code please contact me.

# Maths Mentoring
I teach private maths lesson here
https://buy.stripe.com/fZe01Q3HW0k60cofYZ

# Secret Maths Network

In addition to personal work this repo contains a private encrypted network (PEN) see below...

# Running your own private network

## Create a Cloudflare Tunnel
Tunnels have 4 parts to setup
1. Create a Tunnel with an associated name. That Tunnel can serve traffic for multiple services and multiple hostnames; this example uses a single service and single hostname.

2. Create DNS records for the Tunnel. These DNS records will send traffic to the Tunnel. The records created will not be deleted if the Tunnel is interrupted or if cloudflared or your origin service restarts.

3. Configure the Tunnel by sending traffic to the URL specified. In this example, the only configuration argument required is the URL where traffic should be directed.

4. Run the Tunnel and begin serving traffic.
install cloudflared on debian
```
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cloudflared-linux-amd64.deb
```

```
cloudflared tunnel create timcash_tunnel
```
will reply with something like
```
Created tunnel timcash_tunnel with id 0342965b-deb5-4c65-afff-ccaa8c51bf86
```
and credentials written to
```
/Users/dev/.cloudflared/0342965b-deb5-4c65-afff-ccaa8c51bf86.json
```
Critically
```
You can point DNS records or LB records to this connection when you run the Tunnel
```
## The short version
```
cloudflared tunnel --hostname example.widgetcorp.tech --url localhost:3000 --name dashboard_tunnel2
```
## The long version
Assign a CNAME
```
cloudflared tunnel route dns <UUID or NAME> <hostname>
```
Run the tunnel with specific config
```
cloudflared tunnel --config /path/your-config-file.yaml run
```
to run a hello world server
```
cloudflared tunnel --config cf_config.yml run --hello-world
```

## inspect tunnels
Get all tunnels
```
cloudflared tunnel list
```
Get info on a specific tunnel
```
cloudflared tunnel info <UUID or NAME>
```

## Node.js

Install node.js
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
start a new terminal
```
reset
```
install node 16
```
nvm install 16
```

# Leadership

# Engineering

# Network Defense & Offense

1. 🔭 Carl Sagan
2. 🌱 
3. ⚡ 

# Google Search Tek
FILE TYPE
```
search term filetype:<fileformat>
```
Example
```
steel spec filetype:pdf
```
FOCUS
```
term_a + key
term_a - key
```
OR
```
term_a | term_b
```
RANGE
```
term_a min_number .. max_number
```
```
term_a min_year .. max_year
```

# Linux
Find all files of type
```
find . -type f -name "*.txt"
```
Curl Download File
```
curl -O https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
```
Find pid on port
```
lsof -i:8080
```

# GCP Commands
Create a new instance with 200gb disk and two labels
```
gcloud compute instances create timcash-io --project=migo-333004 --zone=us-central1-a --machine-type=e2-standard-2 --network-interface=network-tier=PREMIUM,subnet=default --metadata=enable-oslogin=true --maintenance-policy=MIGRATE --service-account=733417088753-compute@developer.gserviceaccount.com --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append --create-disk=auto-delete=yes,boot=yes,device-name=timcash-io,image=projects/debian-cloud/global/images/debian-10-buster-v20220406,mode=rw,size=200,type=projects/migo-333004/zones/us-central1-a/diskTypes/pd-ssd --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --labels=p2p=hyper,web=cftunnel --reservation-affinity=any
```
connect after os-login setup
```
ssh -i ~/.ssh/key_file <user_name>@<hostname>
```
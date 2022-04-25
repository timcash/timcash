# GCP Commands
gist with other options
https://gist.github.com/aessing/b3395db31a9feb076e6602d53135560c


Create a new instance with 200gb disk and two labels
```
gcloud compute instances create timcash-io \
--project=migo-333004 \ 
--zone=us-central1-a 
--machine-type=e2-standard-2 \
--network-interface=network-tier=PREMIUM,subnet=default --metadata=enable-oslogin=true \ 
--maintenance-policy=MIGRATE \
--service-account=733417088753-compute@developer.gserviceaccount.com \
--scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
--create-disk=auto-delete=yes,boot=yes,device-name=timcash-io,image=projects/debian-cloud/global/images/debian-10-buster-v20220406,mode=rw,size=200,type=projects/migo-333004/zones/us-central1-a/diskTypes/pd-ssd \
--no-shielded-secure-boot \
--shielded-vtpm \
--shielded-integrity-monitoring \
--labels=p2p=hyper,web=cftunnel \
--reservation-affinity=any
```
connect after os-login setup
```
ssh -i ~/.ssh/key_file <user_name>@<hostname>
```
add a statup script
```
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-10 \
  --metadata-from-file=startup-script=LOCAL_FILE_PATH
```
example start script for a http server
```
#! /bin/bash
apt update
apt -y install apache2
cat <<EOF > /var/www/html/index.html
<html><body><p>Linux startup script from a local file.</p></body></html>
```
pass to existing vm
```
gcloud compute instances add-metadata VM_NAME \
  --metadata-from-file startup-script=FILE_PATH
```
access metadata in startupscript
```
#! /bin/bash
METADATA_VALUE=$(curl http://metadata.google.internal/computeMetadata/v1/instance/attributes/foo -H "Metadata-Flavor: Google")
apt update
apt -y install apache2
cat <<EOF > /var/www/html/index.html
<html><body><p>Accessing metadata value of foo: $METADATA_VALUE</p></body></html>
```
pass in metadata
```
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-10 \
  --metadata-from-file=startup-script=FILE_PATH \
  --metadata=foo=bar
```

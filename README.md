# Teams Room Digital Signage Demo

Provided as is with no support.

Made by me in an afternoon

## Quick start

1. Fork this repo
2. Create a [Reference Script](#reference-script)
3. Upload your content + [Reference Script](#reference-script) to a website or [Azure storage account](#azure-storage-account)
4. Edit [./public/index.html](./public/index.html) and set the [Reference Script](#reference-script)
5. Create an [Azure Static Website](https://azure.microsoft.com/en-us/products/app-service/static) and use GitHub actions to deploy

## Azure storage account

1. Create a storage account
2. Add a public container
3. Upload your images/videos/etc
4. Upload the reference script

## Reference Script

```json
sessionStorage.setItem("slides", JSON.stringify(
	[
		{
			"url": "image.png",
			"mode": "image",
            "end": "2024/11/20"
		},
		{
			"url": "video url.mp4",
			"mode": "video",
            "videotype": "video/mp4",
            "end": "2025/01/01T09:00:00Z"
		},
		{
			"url": "someurl.com",
			"mode": "iframe"
		},
		{
			"url": "background.png",
			"mode": "image+card",
            "title": "Title",
            "body": "Body",
            "link": "https://aka.ms/rooms" //gens a QR code
		},
	]));
```
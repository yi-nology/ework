package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/tencentyun/cos-go-sdk-v5"
)


func main() {
	//将<bucket>和<region>修改为真实的信息
	//bucket的命名规则为{name}-{appid} ，此处填写的存储桶名称必须为此格式
	u, _ := url.Parse("https://ework-1251965636.cos.ap-beijing.myqcloud.com")
	b := &cos.BaseURL{BucketURL: u}

	c := cos.NewClient(b, &http.Client{
		//设置超时时间
		Timeout: 100 * time.Second,
		Transport: &cos.AuthorizationTransport{
			//如实填写账号和密钥，也可以设置为环境变量
			SecretID:  os.Getenv("COS_SECRETID"),
			SecretKey: os.Getenv("COS_SECRETKEY"),
		},
	})

	name := "web.json"
	_, err := c.Object.Delete(context.Background(), name, nil)
	if err != nil {
		panic(err)
	}
	_, response, err := c.Object.Upload(context.Background(), name, "data.json", &cos.MultiUploadOptions{})
	if err != nil {
		panic(err)
	}
	if response.StatusCode != http.StatusOK {
		panic("服务状态码异常")
		return
	}
	resp, err := c.Object.Get(context.Background(), name, nil)
	if err != nil {
		panic(err)
	}
	bs, _ := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	fmt.Printf("%s\n", string(bs))
}

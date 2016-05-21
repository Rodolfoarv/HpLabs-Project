#include <node.h>
#include <v8.h>
#include <uv.h>
#include "generator.h"
#include <string>
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
#include <thread>

using namespace v8;
Generator gen = Generator();



//The reason the function is called GetData in mayus is dictated by the node/v8 API
void GetChartData(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Isolate* isolate = args.GetIsolate();
  v8::String::Utf8Value filename(args[0]->ToString());
  std::string data = std::string(*filename);
  std::string retrieved_data = gen.test(data);
  Local<Object> obj = Object::New(isolate);

  v8::Local<v8::String> hTextJS = v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), retrieved_data.c_str());


  // obj->Set(String::NewFromUtf8(isolate, "data"), String::NewFromUtf8(isolate, retrieved_data));


  // Handle<String> filename = Handle<String>::Cast(args[0]);
  Local<String> retval = v8::String::NewFromUtf8(isolate, "2.19104,-1.17507,0.252469");
  args.GetReturnValue().Set(hTextJS);

}

void init(Handle <Object> exports, Handle<Object> module) {
 // we'll register our functions to make them callable from node here..
 NODE_SET_METHOD(exports, "get_chart_data", GetChartData);
}

// associates the module name with initialization logic
NODE_MODULE(generator, init)

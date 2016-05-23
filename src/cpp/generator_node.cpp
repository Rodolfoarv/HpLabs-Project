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

void GenerateFiles(const v8::FunctionCallbackInfo<v8::Value>& args){
  gen.generate_files();
}

//The reason the function is called GetData in mayus is dictated by the node/v8 API
void GetChartData(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::String::Utf8Value name(args[0]->ToString());
  std::string filename = std::string(*name);
  std::string retrieved_data = gen.read_file(filename);
  v8::Local<v8::String> retval = v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), retrieved_data.c_str());
  args.GetReturnValue().Set(retval);

}

void GetCombinedChart(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::String::Utf8Value file1(args[0]->ToString());
  v8::String::Utf8Value file2(args[1]->ToString());
  std::string filename1 = std::string(*file1);
  std::string filename2 = std::string(*file2);
  std::string retrieved_data = gen.combine_charts(filename1, filename2);
  std::cout << retrieved_data;
  v8::Local<v8::String> retval = v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), retrieved_data.c_str());
  args.GetReturnValue().Set(retval);

}

void init(Handle <Object> exports, Handle<Object> module) {
 // we'll register our functions to make them callable from node here..
 NODE_SET_METHOD(exports, "get_chart_data", GetChartData);
 NODE_SET_METHOD(exports, "get_combined_chart", GetCombinedChart);
 NODE_SET_METHOD(exports, "generate_files", GenerateFiles);
}

// associates the module name with initialization logic
NODE_MODULE(generator, init)

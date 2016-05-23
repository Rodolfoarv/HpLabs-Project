#include <vector>
#include <string>
#include <map>
#include <iostream>
#include <cassert>

using namespace std;

class Generator{
public:
  Generator();
  ~Generator();
  std::map<std::string, std::string > files;
  bool files_generated;
  string join( vector<float>& elements, string delimiter );
  void generate_files();
  string read_file(const string& name);
  string combine_charts(const string& c1, const string& c2);

};

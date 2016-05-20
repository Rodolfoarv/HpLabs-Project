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
  std::map<std::string, std::list<int> > files;
  string join( vector<float>& elements, string delimiter );
  void generate_files();
}

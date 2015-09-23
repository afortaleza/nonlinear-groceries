# Nonlinear Test App

This is the Nonliear test application, it's a list of groceries where you can add, remove, mark as done and reorder items.

## Requirements
- .Net Framework v4.5.1 installed
- Application data is stored in Session, no RDBMS required
## How to run
Clone the git repository and cd into it
```
git clone https://github.com/afortaleza/nonlinear-groceries.git
cd nonlinear-groceries
```
Download DNVM
```
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"
```
Download the latest version of the runtime
```
dnvm upgrade
```
Restore application packages
```
dnu restore
```
Run application
```
dnx web
```
Go to http://localhost:5000/index.html
terraform {
    required_providers {
azurerm = {
source = "hashicorp/azurerm"
}
}
}
provider "azurerm" {
features {}
}
resource "azurerm_resource_group" "dvopsResourceGroupNew" {
name = "dvopsResourceGroupNew"
location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
name = "dvopsAKSCluster"
location = azurerm_resource_group.dvopsResourceGroupNew.location
resource_group_name = azurerm_resource_group.dvopsResourceGroupNew.name
dns_prefix = "budget-buddy-aks"
default_node_pool {
name = "default"
node_count = 1
vm_size = "Standard_DS2_v2"
}
service_principal {
client_id = "204139ba-add0-4b65-8b7a-69d27e53ee00"
client_secret = "Aof8Q~XXF_LYeIwkT3WVUAJE._naRnwcJMRKpdsw"
}
}
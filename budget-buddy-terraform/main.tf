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
resource "azurerm_resource_group" "dvopsResourceGroup" {
name = "dvopsResourceGroup"
location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
name = "dvopsAKSCluster"
location = azurerm_resource_group.dvopsResourceGroup.location
resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
dns_prefix = "rms-aks"
default_node_pool {
name = "default"
node_count = 1
vm_size = "Standard_DS2_v2"
}
service_principal {
client_id = "1da05597-76ec-4255-9d25-93a78b57def0"
client_secret = "k7X8Q~aRCMQD3RVGVcVnDnUwhGl8v6oVU1WzxcNi"
}
}
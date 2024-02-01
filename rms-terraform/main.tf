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
  name     = "dvopsResourceGroup"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
  name                = "dvopsAKSCluster"
  location            = azurerm_resource_group.dvopsResourceGroup.location
  resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
  dns_prefix          = "rms-aks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = "9b055628-3336-4f7e-9194-b04a9476ddf1"
    client_secret = "22t8Q~Zwn_oducUohLFZ_lqg-6YjF4aYr5Xjfcl0"
  }
}

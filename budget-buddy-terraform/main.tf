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
  name     = "dvopsResourceGroupNew"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
  name                = "dvopsAKSCluster"
  location            = azurerm_resource_group.dvopsResourceGroupNew.location
  resource_group_name = azurerm_resource_group.dvopsResourceGroupNew.name
  dns_prefix          = "budget-buddy-aks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = "c7faa4ba-c159-4167-a923-7cf5a967953c"
    client_secret = "HNE8Q~JWiZ6MGqXEBZk0bX4ZJKgBW9zJt-vJpblB"
  }
}

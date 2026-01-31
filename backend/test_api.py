import requests
import time

def test_backend():
    base_url = "http://localhost:8000"
    
    # Wait for service to be ready
    print("Waiting for service to be ready...")
    for _ in range(10):
        try:
            response = requests.get(f"{base_url}/health")
            if response.status_code == 200:
                print("Service is ready!")
                break
        except requests.exceptions.ConnectionError:
            time.sleep(1)
    else:
        print("Service failed to start.")
        return

    try:
        # Test GET /tasks
        print("Testing GET /tasks...")
        response = requests.get(f"{base_url}/tasks")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            tasks = response.json()
            print(f"Found {len(tasks)} tasks")
            for task in tasks[:3]:  # Show first 3 tasks
                print(f"- {task['title']} ({task['status']})")
        else:
            print(f"Error: {response.text}")
            
        # Test POST /tasks
        print("\nTesting POST /tasks...")
        new_task = {
            "title": "Test Task",
            "status": "pending",
            "assignees": ["test_user"],
            "due_date": "2024-03-25T10:00:00",
            "priority": "normal"
        }
        response = requests.post(f"{base_url}/tasks", json=new_task)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            created_task = response.json()
            print(f"Created task: {created_task['title']} (ID: {created_task['id']})")
            
            # Test PUT /tasks/{id}
            print(f"\nTesting PUT /tasks/{created_task['id']}...")
            update_data = {"status": "in_progress"}
            response = requests.put(f"{base_url}/tasks/{created_task['id']}", json=update_data)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                updated_task = response.json()
                print(f"Updated task status to: {updated_task['status']}")
                
                # Test DELETE /tasks/{id}
                print(f"\nTesting DELETE /tasks/{created_task['id']}...")
                response = requests.delete(f"{base_url}/tasks/{created_task['id']}")
                print(f"Status: {response.status_code}")
                if response.status_code == 204:
                    print("Task deleted successfully")
                    
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to backend server. Make sure it's running on port 8000.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_backend()
